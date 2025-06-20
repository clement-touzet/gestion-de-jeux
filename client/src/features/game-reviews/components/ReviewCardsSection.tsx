type Props = {
  error: Error | null;
  isError: boolean;
} & React.PropsWithChildren;

const ReviewCardsSection = ({ error, isError, children }: Props) => {
  if (isError)
    return (
      <p>
        Une erreur est survenue lors du chargement de vos avis :
        {error ? error.message : null}
      </p>
    );

  return <div className="flex flex-wrap gap-4 py-8">{children}</div>;
};

export default ReviewCardsSection;
