import './button.css'

const Receive = () => {

    const handleClick = () => {
        alert("Receive Files")
    }

    return (
        <div className = "receivefiles">
            <button class="btn receiveFilesButton" onClick={handleClick}>RECEIVE</button>
        </div>
    );
}

export default Receive;