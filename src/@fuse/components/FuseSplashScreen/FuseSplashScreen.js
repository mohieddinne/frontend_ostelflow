function FuseSplashScreen() {
  return (
    <div id="fuse-splash-screen">
      <div className="center">
        <div className="logo">
          <img
            src="assets/logos/tekru-white.png"
            className="w-[300px]"
            alt="logo"
          />
        </div>
        <div className="spinner-wrapper">
          <div className="spinner">
            <div className="inner">
              <div className="gap" />
              <div className="left">
                <div className="half-circle" />
              </div>
              <div className="right">
                <div className="half-circle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FuseSplashScreen;
