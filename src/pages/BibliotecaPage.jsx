import "./biblioteca.css"
import React, { useState } from "react"
import { useRequestData } from "../hooks/useRequestData"
import { JogoCard } from "../components/JogoCard"
import { api } from "../services/api"
import { useNavigate } from "react-router"

export const BibliotecaPage = () => {
    const [usuario] = useRequestData('/auth/me')
    const [exclusaoErro, setExclusaoErro] = useState("")
    const [atualizacaoErro, setAtualizacaoErro] = useState("")
    const [jogoSendoEditado, setJogoSendoEditado] = useState(null)
    const navigate = useNavigate()
    
    const [bibliotecaData, isLoading, error] = useRequestData(
        usuario?.matricula ? `/usuarios/${usuario.matricula}/jogos` : null
    )

    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        preco: "",
        desenvolvedora: "",
        lancamento: "",
        capaUrl: "",
        generoIds: ""
    })

    const formatReleaseDate = (isoDate) => {
        return isoDate && new Date(isoDate).toLocaleDateString("pt-BR") || "N/A"
    }

    const handleDelete = async (id) => {
        setExclusaoErro("")
        const confirmar = window.confirm("Deseja mesmo excluir este jogo?")
        if (confirmar) {
            try {
                const token = window.localStorage.getItem("token")
                await api.delete(`/jogos/${id}`, { headers: { token } })
                window.location.reload()
            } catch (err) {
                setExclusaoErro(err.response?.data?.message || err.message)
            }
        }
    }

    const handleStartEdit = (jogo) => {
        setJogoSendoEditado(jogo)
        setForm({
            titulo: jogo.titulo || "",
            descricao: jogo.descricao || "",
            preco: jogo.preco || "",
            desenvolvedora: jogo.desenvolvedora || "",
            lancamento: jogo.lancamento ? jogo.lancamento.substring(0, 10) : "",
            capaUrl: jogo.capaUrl || "",
            generoIds: jogo.generos ? jogo.generos.map(g => g.id).join(", ") : ""
        })
    }

    const onChangeForm = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        setAtualizacaoErro("")
        try {
            const token = window.localStorage.getItem("token")
            const body = {
                titulo: form.titulo,
                descricao: form.descricao,
                preco: Number(form.preco),
                desenvolvedora: form.desenvolvedora,
                lancamento: new Date(form.lancamento).toISOString(),
                capaUrl: form.capaUrl,
                generoIds: form.generoIds.split(",").map(id => Number(id.trim()))
            }

            await api.patch(`/jogos/${jogoSendoEditado.id}`, body, { headers: { token } })
            setJogoSendoEditado(null)
            window.location.reload()
        } catch (err) {
            setAtualizacaoErro(err.response?.data?.message || err.message)
        }
    }

    const goToCriarJogo = () => {
        navigate("/perfil/biblioteca/criar-jogos")
    }

    const exibirLista = !isLoading && !error && !jogoSendoEditado && bibliotecaData && bibliotecaData.length > 0 
    const nenhumJogoCriado = !isLoading && !error && !jogoSendoEditado && (!bibliotecaData || bibliotecaData.length === 0)
    const exibirFormularioEdicao = !isLoading && !error && jogoSendoEditado

   return (
  <main className="biblioteca-page">
    <section className="biblioteca-header">
      <div>
        <h1>
          Minha Biblioteca
          <span>{bibliotecaData?.length || 0} jogos</span>
        </h1>

        <p>Início / Biblioteca</p>
      </div>

      {!jogoSendoEditado && (
        <button className="btn-criar-jogo" onClick={goToCriarJogo}>
          Criar jogo
        </button>
      )}
    </section>

    {isLoading && (
      <p className="biblioteca-loading">Carregando Biblioteca...</p>
    )}

    {error && <p className="biblioteca-error">Error: {error}</p>}

    {exclusaoErro && (
      <p className="biblioteca-exclusao-error">
        Erro ao excluir: {exclusaoErro}
      </p>
    )}

    {atualizacaoErro && (
      <p className="biblioteca-atualizacao-error">
        Erro ao alterar: {atualizacaoErro}
      </p>
    )}

    {exibirLista && (
      <>
        <section className="biblioteca-filters">
          <input type="text" placeholder="Buscar na biblioteca..." />

          <select>
            <option>A - Z</option>
            <option>Z - A</option>
          </select>
        </section>

        <section className="biblioteca-lista">
          {bibliotecaData.map((jogo) => (
            <JogoCard
              key={jogo.id}
              jogo={jogo}
              formatReleaseDate={formatReleaseDate}
              onDelete={handleDelete}
              onEdit={handleStartEdit}
            />
          ))}
        </section>
      </>
    )}

    {exibirFormularioEdicao && (
      <section className="alterar-jogo-container">
        <h2>Alterar Jogo</h2>

        <form onSubmit={onSubmitForm} className="alterar-jogo-form">
          <label>Título</label>
          <input
            name="titulo"
            value={form.titulo}
            onChange={onChangeForm}
            required
          />

          <label>Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={onChangeForm}
            required
          />

          <label>Preço</label>
          <input
            type="number"
            step="0.01"
            name="preco"
            value={form.preco}
            onChange={onChangeForm}
            required
          />

          <label>Desenvolvedora</label>
          <input
            name="desenvolvedora"
            value={form.desenvolvedora}
            onChange={onChangeForm}
            required
          />

          <label>Lançamento</label>
          <input
            type="date"
            name="lancamento"
            value={form.lancamento}
            onChange={onChangeForm}
            required
          />

          <label>URL da capa</label>
          <input
            name="capaUrl"
            value={form.capaUrl}
            onChange={onChangeForm}
            required
          />

          <label>IDs dos gêneros</label>
          <input
            name="generoIds"
            value={form.generoIds}
            onChange={onChangeForm}
            required
          />

          <div className="form-actions">
            <button type="submit" className="btn-salvar">
              Salvar Alterações
            </button>

            <button
              type="button"
              className="btn-cancelar"
              onClick={() => setJogoSendoEditado(null)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>
    )}

    {nenhumJogoCriado && (
      <section className="biblioteca-empty">
        <h2>Nenhum jogo criado encontrado.</h2>
        <p>Crie seu primeiro jogo para ele aparecer aqui.</p>

        <button onClick={goToCriarJogo}>Criar um jogo</button>
      </section>
    )}
  </main>
);
}
