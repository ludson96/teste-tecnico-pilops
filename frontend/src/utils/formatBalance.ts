 export function formatBalance(balance: number): string {
   const options = {
     minimumFractionDigits: 2,
     maximumFractionDigits: 2,
   };
 
   const formattedValue = Math.abs(balance).toLocaleString('pt-BR', options);
 
   if (balance >= 0) {
     return `P$ ${formattedValue}`;
   } else {
     return `- P$ ${formattedValue}`;
   }
 }
