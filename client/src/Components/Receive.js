import './button.css'

const Receive = () => {

    const handleClick = () => {
        alert("Receive Files")
    }

    return (
        <div className = "receivefiles">
            <button type = "button" class="button receiveFilesButton col-2" onClick={handleClick}>RECEIVE</button>
        </div>
    );
}

export default Receive;