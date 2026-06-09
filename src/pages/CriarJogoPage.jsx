import React, { useState, useEffect } from "react"
import { api } from "../services/api"
import "./criarjogos.css"

export const CriarJogoPage = () => {
    const [listasGeneros, setListasGeneros] = useState([])
    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        preco: "",
        desenvolvedora: "",
        lancamento: "",
        capaUrl: "",
        generoIds: []
    })

    useEffect(() => {
        const pegarGeneros = async () => {
            try {
                const response = await api.get("/generos")
                setListasGeneros(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        pegarGeneros()
    }, [])

    const onChangeForm = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleCheckboxChange = (id) => {
        const idNumero = Number(id)
        const idsAtualizados = form.generoIds.includes(idNumero)
            ? form.generoIds.filter((item) => item !== idNumero)
            : [...form.generoIds, idNumero]

        setForm({ ...form, generoIds: idsAtualizados })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const token = window.localStorage.getItem("token")
            
            const body = {
                titulo: form.titulo,
                descricao: form.descricao,
                preco: Number(form.preco),
                desenvolvedora: form.desenvolvedora,
                lancamento: new Date(form.lancamento).toISOString(),
                generoIds: form.generoIds
            }

            if (form.capaUrl.trim() !== "") {
                body.capaUrl = form.capaUrl.trim()
            }

            await api.post("/jogos", body, { headers: { token } })
            alert("Jogo criado com sucesso")
            setForm({ titulo: "", descricao: "", preco: "", desenvolvedora: "", lancamento: "", capaUrl: "", generoIds: [] })
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
                />
                
                <div className="generos-checkbox-container">
                    <label style={{ display: 'block', margin: '10px 0 5px' }}>Selecione os Gêneros:</label>
                    {listasGeneros.map((genero) => (
                        <label key={genero.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '5px 0' }}>
                            <input
                                type="checkbox"
                                checked={form.generoIds.includes(genero.id)}
                                onChange={() => handleCheckboxChange(genero.id)}
                            />
                            {genero.nome}
                        </label>
                    ))}
                </div>

                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}
