import "../styles/Navbar.css"

type NavBarProps = {
    onReset: () => void;
}

// When navbar heading is clicked, page resets to show all initial contributions and all pages
function NavBar({ onReset }: NavBarProps) {
    return (
        <div className="navbar">
            <h2 className="navbar-heading" onClick={onReset} >Contributions</h2>
        </div>
    )

}

export default NavBar;