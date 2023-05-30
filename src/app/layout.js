import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* header */}
        <div class="layout">
          <div class="header">
            <div class="header-logo">
              <a href='/'>
                <img src="/images/Logo.jpg" alt="Cockle Bay School" width="201" height="110px" />
              </a>
            </div>

            <div class="header-nag">
              <Link href="/Teachers">Teachers</Link>

              <Link href="/Students">Students</Link>

              <Link href="/Rooms">Rooms</Link>

              <Link href="/Scores">Scores</Link>

            </div>
          </div>

          {/* body */}
          <div class="main">
            {children}
          </div>

          {/* footer */}
          <div class="footer">
            <div>
              <h3 class="footer-block-big">Cockle Bay School</h3>
              <p class="footer-block-small">28 Sandspit Road
                <br></br>Howick
                <br></br> Auckland 2014
              </p>
            </div>
            <div>
              <h3 class="footer-block-big">Contact Office</h3>
              <p class="footer-block-small">Phone  534 8333
                <br></br>Enquiry
                <a href="\">click here</a>
              </p>
            </div>
            <div>
              <h3 class="footer-block-big">School Hours</h3>
              <p class="footer-block-small">8:45am to 3:00pm
              </p>
            </div>
            <div>
              <h3 class="footer-block-big">Office Hours </h3>
              <p class="footer-block-small">8:00am to 4:00pm
              </p>
            </div>
          </div>
        </div>

      </body>
    </html>
  )
}
