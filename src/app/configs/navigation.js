const main = [
  {
    id: "applications",
    title: "Portail Ostelflow",
    translate: "portal",
    type: "group",
    icon: "apps",
    auth: "login",
    children: [
      {
        id: "Home",
        title: "Accueil",
        translate: "home",
        type: "item",
        icon: "home",
        url: "/app/home",
        auth: "login",
      },

      {
        id: "assignment",
        title: "Affectation des chambres",
        translate: "assign",
        type: "item",
        icon: "assignment",
        url: "/app/assignments",
        auth: "affectation_management",
      },
      {
        id: "followRoom",
        title: "Suivie des chambre a vérifié",
        translate: "followRoom",
        type: "item",
        icon: "equalizer",
        url: "/app/follow/",
        auth: "follow_room",
      },
      {
        id: "followMaintain",
        title: "Suivie des taches de maintenance",
        translate: "followMaintain",
        type: "item",
        icon: "equalizer",
        url: "/app/maintain/",
        auth: "follow_maintain_tasks",
      },
      // {
      //   id: "timesheet",
      //   title: "Liste des taches",
      //   translate: "task_list",
      //   type: "item",
      //   icon: "list",
      //   url: "/app/timesheets",
      //   // auth: "affectation_management",
      // },
      // {
      //   id: "timesheet",
      //   title: "Les tâches de maintenances",
      //   translate: "task_maintain_list",
      //   type: "item",
      //   icon: "list",
      //   url: "/app/maintainTasks/list",
      //   auth: "affectation_management",
      // },
    ],
  },
];

const user = [
  {
    id: "account",
    translate: "account",
    type: "group",
    auth: "login",
    children: [
      {
        id: "myprofile",
        translate: "my_profil",
        type: "item",
        auth: "login",
        icon: "account_circle",
        url: "/users/profile",
      },
    ],
  },
];

const help = [
  {
    id: "phone-assistance",
    translate: "phone_assistance",
    type: "item",
    auth: "login",
    icon: "phone",
    url: "/app/phone-assistance",
  },
];

export default main;

export { main, user, help };
