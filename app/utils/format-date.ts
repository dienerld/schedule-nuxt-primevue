export function formatDate(date: Date): string {
  return Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
