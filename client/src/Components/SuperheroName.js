import './button.css'

const SuperheroName = () => {

    return (
        <div className = "SuperheroName">
            <form>
                Superhero Name:
                <label>
                    <input type="text" name="name" className = "FilenameBox" placeholder="Enter Name"/>
                </label>
            </form>
        </div>
    );
}

export default SuperheroName;
