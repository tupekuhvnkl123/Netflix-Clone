//// Packages
import { Modal, Fade, Button } from "@mui/material";

//// Styles
import classes from "../../style/Account/DeleteAccountModal.module.scss";

const DeleteAccountModal = (props) => {
  return (
    <Modal
      open={!!props.open}
      onClose={props.onClose}
      className={classes.modal}
      closeAfterTransition
    >
      <Fade in={!!props.fadeIn}>
        <div className={classes.content}>
          <p>{props.content}</p>
          <div className={classes.buttons}>
            <Button
              onClick={props.onClickConfirm}
              className={classes.confirmBtn}
              color="error"
              variant="contained"
            >
              Confirm
            </Button>
            <Button
              onClick={props.onClose}
              className={classes.cancelBtn}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteAccountModal;
