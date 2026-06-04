import React, { useState } from "react"
import { api } from "../services/api"

export const CriarJogoPage = () => {
    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        preco: "",
        desenvolvedora: "",
        lancamento: "",
        capaUrl: "",
        generoIds: ""
    })

    const onChangeForm = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const token = window.localStorage.getItem("token")
            const body = {
                ...form,
                preco: Number(form.preco),
                lancamento: new Date(form.lancamento).toISOString(),
                generoIds: form.generoIds.split(",").map(id => Number(id.trim()))
            }

            await api.post("/jogos", body, { headers: { token } })
            alert("Jogo criado com sucesso")
            setForm({ titulo: "", descricao: "", preco: "", desenvolvedora: "", lancamento: "", capaUrl: "", generoIds: "" })
        } catch (err) {
            alert("Erro ao criar jogo: " + err.message)
        }
    }

    return (
        <div className="criar-jogo-container">
            <h2>Criar Novo Jogo</h2>
            <form onSubmit={onSubmitForm}>
                <input
                    placeholder="Título"
                    name="titulo"
                    value={form.titulo}
                    onChange={onChangeForm}
                    required
                />
                <textarea
                    placeholder="Descrição"
                    name="descricao"
                    value={form.descricao}
                    onChange={onChangeForm}
                    required
                />
                <input
                    placeholder="Preço"
                    type="number"
                    step="0.01"
                    name="preco"
                    value={form.preco}
                    onChange={onChangeForm}
                    required
                />
                <input
                    placeholder="Desenvolvedora"
                    name="desenvolvedora"
                    value={form.desenvolvedora}
                    onChange={onChangeForm}
                    required
                />
                <input
                    type="date"
                    name="lancamento"
                    value={form.lancamento}
                    onChange={onChangeForm}
                    required
                />
                <input
                    placeholder="URL da Capa"
                    name="capaUrl"
                    value={form.capaUrl}
                    onChange={onChangeForm}
                    required
                />
                <input
                    placeholder="IDs Gêneros (separados por vírgula)"
                    name="generoIds"
                    value={form.generoIds}
                    onChange={onChangeForm}
                    required
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}
