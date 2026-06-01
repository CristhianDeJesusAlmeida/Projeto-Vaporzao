import { useForm } from "../hooks/useForm";
import { loginToken } from "../components/LoginToken"

export const LoginPage = () => {

    const [form, onChange] = useForm({ matricula: "", password: "" })

    const handleClick = (event) => {
        event.preventDefault();
        
        loginToken(form.matricula, form.password);
    }

    return (
        <form onSubmit={handleClick}>
            <input
                name="matricula"
                value={form ?.matricula || ""}
                pattern="\d{2}-\d{5}"
                onChange={onChange}
                placeholder="matricula" />

            <input 
                type="password"
                name="password"
                onChange={onChange}
                value={form?.password || ""}
                placeholder="senha"
                autoComplete="off"/>
            <button type="submit">Fazer Login</button>
        </form>
    )
}

