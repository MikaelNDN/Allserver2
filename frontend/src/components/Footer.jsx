export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-col">
                    <h3 className="logo">All<span>Serve</span></h3>
                    <p>2025 AllServe.<br/>Todos os direitos reservados.</p>
                </div>
                <div className="footer-col">
                    <h4>Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/sobre">Sobre</a></li>
                        <li><a href="/profissionais">Profissionais</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Help</h4>
                    <ul>
                        <li><a href="#">Payment Options</a></li>
                        <li><a href="#">Returns</a></li>
                        <li><a href="#">Privacy Policies</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Newsletter</h4>
                    <form>
                        <input type="email" placeholder="Enter Your Email Address" required />
                        <button type="submit">SUBSCRIBE</button>
                    </form>
                </div>
            </div>
        </footer>
    );
}