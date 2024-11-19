import './Footer.css';

export const Footer = () => {
    return (
      <div className='footer-border'>
      <div className="footer">
        <div className="box-container">
          <div className="box">
            <h3>quick links</h3>
            <a href="#">Hem</a>
            <a href="#">Om Oss</a>
            <a href="#">Boende</a>
            <a href="#">Omdömmen</a>
            <a href="#">Kontakt</a>
          </div>
  
          <div className="box">
            <h3>extra links</h3>
            <a href="#">Mitt konto</a>
            <a href="#">Min Bokning</a>
            <a href="#">Mina Favoriter</a>
          </div>
  
          <div className="box">
            <h3>locations</h3>
            <a href="#">Stockholm</a>
            <a href="#">Göteborg</a>
            <a href="#">Luleå</a>
            <a href="#">Norrköping</a>
          </div>
  
          <div className="box">
            <h3>contact info</h3>
            <a href="#">+123-456-7890</a>
            <a href="#">example@gmail.com</a>
            <a href="#">Stockholm, Sverige - 13456</a>
            <img src="image/payment.png" alt="" />
          </div>
        </div>
  
        <div className="credit"> created by <span> Alva Ahlberg </span> | all rights reserved </div>
      </div>
      </div>
    );
  }
  
  export default Footer;

// import './Footer.css';

// export const Footer = () => {
//     return (
//       <div className='footer-border'>
//       <div className="footer">
//         <div className="box-container">
//           <div className="box">
//             <h3>quick links</h3>
//             <a href="#">home</a>
//             <a href="#">about</a>
//             <a href="#">products</a>
//             <a href="#">review</a>
//             <a href="#">contact</a>
//           </div>
  
//           <div className="box">
//             <h3>extra links</h3>
//             <a href="#">my account</a>
//             <a href="#">my order</a>
//             <a href="#">my favorite</a>
//           </div>
  
//           <div className="box">
//             <h3>locations</h3>
//             <a href="#">Sweden</a>
//             <a href="#">USA</a>
//             <a href="#">Germany</a>
//             <a href="#">france</a>
//           </div>
  
//           <div className="box">
//             <h3>contact info</h3>
//             <a href="#">+123-456-7890</a>
//             <a href="#">example@gmail.com</a>
//             <a href="#">Stockholm, Sweden - 13456</a>
//             <img src="image/payment.png" alt="" />
//           </div>
//         </div>
  
//         <div className="credit"> created by <span> Alva Ahlberg </span> | all rights reserved </div>
//       </div>
//       </div>
//     );
//   }
  
//   export default Footer;