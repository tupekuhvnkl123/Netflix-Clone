//// Packages
import { useContext, useState } from "react";
//// Components
import UltraHdSvg from "./UltraHdSvg";
import DeleteAccountModal from "./DeleteAccountModal";
//// Style
import classes from "../../style/Account/AccountInfo.module.scss";
//// Shared
import { AuthContext } from "../../shared/context/auth-context";

const AccountInfo = ({ onDeleteAccount }) => {
  const authCtx = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <DeleteAccountModal
        content="This action will delete your account. Are you sure you want to continue?"
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        fadeIn={showDeleteModal}
        onClickConfirm={onDeleteAccount}
      />

      <main className={classes.main}>
        <div className={classes.container}>
          <div className={classes.title}>
            <h1>Account</h1>
          </div>
          <hr />
          <div className={classes.membership}>
            <div className={classes.subjectTitle}>
              <h2>MEMBERSHIP</h2>
              <button onClick={() => setShowDeleteModal(true)}>
                Cancel Membership
              </button>
            </div>
            <div className={classes.details}>
              <p>{authCtx.user ? authCtx.user.name : "Name"}</p>
              <p>{authCtx.user ? authCtx.user.email : "Email"}</p>
            </div>
          </div>
          <hr />
          <div className={classes.planDetails}>
            <div className={classes.subjectTitle}>
              <h2>PLAN DETAILS</h2>
            </div>
            <div>
              <div className={classes.premiumUltraHd}>
                <p>Premium</p>
                <UltraHdSvg className={classes.ultraHdSvg} />
              </div>
              <p>No DVD Plan</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountInfo;
