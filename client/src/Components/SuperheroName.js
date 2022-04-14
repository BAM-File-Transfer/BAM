import './button.css'

const SuperheroName = () => {

    return (
        <div className = "SuperheroName">
            <form>
                Superhero Name<br></br>
                <label>
                    <input type="text" name="name" placeholder="Enter Name"/>
                </label>
            </form>
        </div>
    );
}

export default SuperheroName;
