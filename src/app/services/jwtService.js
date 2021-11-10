import jwtDecode from "jwt-decode";
import FuseUtils from "@fuse/FuseUtils";

class jwtService extends FuseUtils.EventEmitter {
  init() {
    this.handleAuthentication();
  }

  handleAuthentication = () => {
    // Get Token
    let access_token = this.getAccessToken();

    // If there is no access token emit()
    if (!access_token) {
      this.emit("onNoAccessToken");
      return;
    }

    // Verify the token
    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "error.session_expired");
    }
  };

  handleLogin = (token) => {
    this.setSession(token);
  };

  logout = () => this.setSession(null);

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
    } else {
      localStorage.removeItem("jwt_access_token");
    }
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }

    try {
      const decoded = jwtDecode(access_token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp >= currentTime) {
        return true;
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error(error);
      }
    }

    return false;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };

  getAuthHeaders = () => {
    const token = this.getAccessToken();
    const header = {};
    if (token) {
      header.authorization = "Bearer " + this.getAccessToken();
    }
    return header;
  };
}

const instance = new jwtService();

export default instance;
