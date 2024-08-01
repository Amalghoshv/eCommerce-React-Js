import "../../styles/button.css";
// eslint-disable-next-line react/prop-types
const Button = ({children , onClick, className, ...props})=>{
    return(
        <button className={`btn ${className}`} onClick={onClick} {...props}>{children}</button>
    );

}
export default Button;