import styles from "./styles.module.scss";

const Footer = () => {
  function goRepo():void {
    window.location.href = "https://github.com/WILKmichal/imazure";
  }

  return (
    <div className="container-fluid text-center text-md-left">
      <hr />
      <div className="row">
        <div>
          <h5 className="text-uppercase">Michal Ronan Raphael</h5>
          <span onClick={goRepo} className={styles.ForgotPassword}>
            Github
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
