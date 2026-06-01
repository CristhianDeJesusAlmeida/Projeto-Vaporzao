import { useForm } from "../hooks/useForm";
import {LoginToken} from "../components/LoginToken"

export const LoginPage = () => {

    const [form, onChange] = useForm({ matricula: "", password: "" })

    const handleClick = (event) => {
        event.preventDefault();
        <LoginToken />
    }

    return (
        <form onSubmit={handleClick}>
            <input
                type="matricula"
                name="matricula"
                value={form}
                pattern="^d{2}-\^d{5}$"
                onChange={onChange}
                placeholder="matricula" />

            <input 
                type="passowrd"
                name="passowrd"
                onChange={onChange}
                placeholder="senha"/>
            <button>Fazer Login</button>
        </form>
    )
}

