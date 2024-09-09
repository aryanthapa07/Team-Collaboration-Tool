const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="dropDownFormPosition">
      <div className="dropDownFormStyling">
        <p>{message}</p>
        <div className="dropDownFormButtons">
          <button className="cardRedButton" onClick={onConfirm}>
            Yes
          </button>
          <button className="graybutton" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
