// function ButtonSignin() {
//     return (
//         <div className="m-4 text-right">
//             <button className="bg-primary p-4 w-35 md:w-50 lg:w-70 rounded-full items-center text-md md:text-xl lg:text-3xl text-white font-semibold hover:bg-secondary hover:text-black" type="button">Signup</button>
//         </div>
//     );
// }export default ButtonSignin;

function ButtonSignin({ onSignin, loading}) {
    return (
      <div className="m-4 text-right">
        <button
          className="bg-primary p-4 w-35 md:w-50 lg:w-70 rounded-full items-center text-md md:text-xl lg:text-3xl text-white font-semibold hover:bg-secondary hover:text-black"
          type="button"
          onClick={onSignin}
          disabled={loading}
        >
          {loading ? "Loading..." : "Signin"}
        </button>
      </div>
    );
  }
  export default ButtonSignin;
  