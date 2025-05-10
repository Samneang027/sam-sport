import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
function ButtonBack() {
    return (
        <button className="bg-white hover:bg-custom font-bold md:text-xl lg:text-3xl pt-2 pr-6 pb-2 pl-6 rounded-full"><FontAwesomeIcon icon={faLeftLong} /></button>
    );
}export default ButtonBack;