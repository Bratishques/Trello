import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import LogoutButton from "./logoutButton"

const Header = () => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1200,
        padding: `1rem 1.0875rem`,
        display: `grid`,
        gridTemplateColumns: "200px 1fr"
      }}
    >
      <h1 style={{ margin: 0, fontSize: "25px"}}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          BootlegTrello
        </Link>
      </h1>
      <LogoutButton/>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
