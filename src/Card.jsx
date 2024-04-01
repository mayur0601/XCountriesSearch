export default function Card({ country }) {

  let {name,flags} = country;
  
  return (
    <div className="countryCard">
      <div className="countryCard_image">
        <img src={flags.png} alt={flags.alt}/>
      </div>
      <div className="country_name">{name.common}</div>
    </div>
  );
}
