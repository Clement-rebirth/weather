interface ErrorProps {
  errors: string[];
}

const Error = ({ errors }: ErrorProps) => {
  errors.forEach(error => console.error(error));

  return (
    <div className='error'>
      <p>Une erreur est survenue. Vérifiez votre connexion internet et rechargez la page.</p>
      <button onClick={() => window.location.reload()}>Recharger la page</button>
    </div>
  );
};

export default Error;
