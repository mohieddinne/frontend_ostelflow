import React, { useEffect, useState } from "react";
import { Divider, Drawer } from "@material-ui/core";
import { FuseScrollbars } from "@fuse";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./store/actions/index";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducers";
// import NewsBlockQuickPanel from "app/main/origin/news-block/components/quick-panel";
import { makeStyles } from "@material-ui/styles";
import {
  useSubscription,
  gql,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 280,
  },
}));
const QUERY = gql`
  query notifications($ids: [Int]) {
    notifications(ids: $ids) {
      id
      userId
      activityType
      sourceId
      parentId
      description
      seen
    }
  }
`;
const DISABLE_NOTIFICATION = gql`
  mutation disableNotifications($ids: [Int]) {
    disableNotifications(ids: $ids)
  }
`;
const MARk_AS_READ = gql`
  mutation markAsRead($ids: [Int]) {
    markAsRead(ids: $ids)
  }
`;

const SUBSCRIPTION = gql`
  subscription notifications {
    notifications {
      id
      userId
      activityType
      sourceId
      parentId
      description
    }
  }
`;
function NotificationPanel(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState([]);
  const [del, setDelete] = useState(false);
  const [marque, setMarque] = useState(false);

  const NotificationState = useSelector(
    ({ quickPanel }) => quickPanel.NotificationState
  );
  const classes = useStyles();
  const [getNotifications, { data: arrNotifications, refetch }] = useLazyQuery(
    QUERY
  );
  const [disableNotifications, { loading }] = useMutation(DISABLE_NOTIFICATION);
  const [markAsRead] = useMutation(MARk_AS_READ);

  function handleDisableNotifcation(notification) {
    setDelete(!del);

    disableNotifications({
      variables: {
        ids: [parseInt(notification?.id)] || [],
      },
    })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handlemarkAsRead(notification) {
    setMarque(!marque);
    markAsRead({
      variables: {
        ids: [parseInt(notification?.id)] || [],
      },
    })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const { data } = useSubscription(SUBSCRIPTION);

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    // Only when first render
    if (!notifications.length > 0) {
      getNotifications({ variables: { ids: [] } });
    }
  }, [notifications, getNotifications]);
  useEffect(() => {
    if (data) setNotifications([data?.notifications, ...notifications]);
    else if (!data && arrNotifications)
      setNotifications(arrNotifications?.notifications);
  }, [data, arrNotifications]);

  useEffect(() => {
    dispatch(Actions.increment_decrement_notification(notifications.length));
  }, [notifications]);
  useEffect(() => {
    if (notifications) {
      setShow(new Array(notifications.length));
    }
  }, [notifications]);

  function openSelectedNotification(i, notification) {
    handlemarkAsRead(notification);
    const tmp = show;
    tmp[i] = !tmp[i];
    setShow((prevState) => {
      return {
        ...prevState,
        tmp,
      };
    });
  }

  return (
    <Drawer
      classes={{ paper: classes.root }}
      open={NotificationState}
      anchor="right"
      onClose={(ev) => dispatch(Actions.toggleNotificationPanel())}
    >
      <FuseScrollbars>
        <div className="flex flex-col m-8">
          <span className="inline-block text-2xl font-extrabold text-gray-900 tracking-tight">
            Notifications
          </span>
          <div className="flex justify-between mt-8">
            <span
              role="button"
              className={
                del && "bg-gray-600 text-white rounded-lg 200 underline  p-4"
              }
              onClick={(e) => handleDisableNotifcation()}
            >
              Supprimer tout
            </span>
            <span
              role="button"
              className={
                marque && "bg-gray-600 text-white rounded-lg 200 underline  p-4"
              }
              onClick={(e) => handlemarkAsRead()}
            >
              Marquer comme lu
            </span>
          </div>
          <Divider className="mt-8" />

          <div>
            {notifications
              ?.filter((e) => e?.description !== "start_timer")
              .map((notification, i) => (
                <div
                  role="button"
                  onClick={(e) => openSelectedNotification(i, notification)}
                  className={
                    !notification?.seen
                      ? " flex items-center justify-between bg-gray-600 text-white m-8  rounded-lg 200 pl-8  "
                      : " flex items-center justify-between m-8 pl-8  bg-gray-200 text-gray-600  rounded-lg 200 "
                  }
                >
                  <h1 className="text-18">
                    <span>{notification.description}</span>
                  </h1>
                  <span>
                    {show[i] ? (
                      <span
                        className="icon delete-icon hover-show  m-8  "
                        role="button"
                        onClick={(e) => handleDisableNotifcation(notification)}
                      >
                        <ClearOutlinedIcon />
                      </span>
                    ) : (
                      <span className="icon delete-icon hover-show  m-8 pr-8 ">
                        ...
                      </span>
                    )}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </FuseScrollbars>
    </Drawer>
  );
}

export default withReducer("quickPanel", reducer)(NotificationPanel);
