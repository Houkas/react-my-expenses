import './Card.css';
function Card(props:any){
    return(
        <div className='bg-color-lgrey p-2'>{props.children}</div>
    );
}

export default Card;