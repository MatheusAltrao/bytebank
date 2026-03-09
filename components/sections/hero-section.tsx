import AvaliableAmountCard from './components/avaliable-amount-card'

export default function HeroSection() {
  return (
    <div className="bg-secondary p-8 rounded-xl flex flex-col gap-4">
      <div>
        <h3 className="text-2xl font-medium">Olá, Seja bem vindo(a)</h3>
        <p className="text-muted-foreground">Estamos muito felizes em te ver por aqui!</p>
      </div>
      <AvaliableAmountCard />
    </div>
  )
}
