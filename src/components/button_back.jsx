import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function ButtonBack() {
    return (
        <Link to="/" className="text-white hover:text-gray-400 font-bold md:text-xl lg:text-3xl"><FontAwesomeIcon icon={faLeftLong} /></Link>
    );
}export default ButtonBack;