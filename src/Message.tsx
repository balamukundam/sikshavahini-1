//PascalCasing
function Message() {
    const name = 'Ang';

    if (name)
        return(
            <div>
                <h1>Hello World</h1>
                <p> {name} </p>
            </div>         
        );
    
        return(
            <div>
                <h1>Hello World</h1>
                <p> no name</p>
            </div>         
        );
}

export default Message;