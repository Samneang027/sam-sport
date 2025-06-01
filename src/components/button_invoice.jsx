
function ButtonInvoice({ onClick }) {
  return (
    <div className="m-4 text-right">
      <button
        onClick={onClick}
        className="bg-primary p-4 w-35 md:w-50 lg:w-70 rounded-full items-center text-md md:text-xl lg:text-3xl text-white font-semibold hover:bg-secondary hover:text-black"
        type="button"
      >
        Print Invoice
      </button>
    </div>
  );
}

export default ButtonInvoice;




