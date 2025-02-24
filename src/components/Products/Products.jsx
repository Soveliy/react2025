import './Products.css';

function Products({ name, desc, date }) {
    return (
        <>
            <p>{name}</p>
            <p>{date.toString()}</p>
            <p>{desc}</p>

        </>
    )
}
export default Products