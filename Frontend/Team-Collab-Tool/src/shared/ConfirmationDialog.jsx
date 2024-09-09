const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="dropDownFormPosition">
      <div className="dropDownFormStyling">
        <p className="font-semibold text-xl">{message}</p>
        <div className="dropDownFormButtons mt-7">
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
