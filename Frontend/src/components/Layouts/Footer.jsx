//// Style
import classes from "../../style/Layouts/Footer.module.scss";

const Footer = ({ className }) => {
  return (
    <footer className={`${classes.footer} ${className}`}>
      <div className={classes.wrapper}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://help.netflix.com/en/contactus"
          className={classes.contactUs}
        >
          Questions? Contact us.
        </a>
        <div className={classes.links}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://help.netflix.com/en/node/412"
          >
            FAQ
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://help.netflix.com/en/"
          >
            Help Center
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://media.netflix.com/en/"
          >
            Media Center
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://ir.netflix.net/ir-overview/profile/default.aspx"
          >
            Investor Relations
          </a>
          <a target="_blank" rel="noreferrer" href="https://jobs.netflix.com/">
            Jobs
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://devices.netflix.com/en/"
          >
            Ways to Watch
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://help.netflix.com/legal/termsofuse"
          >
            Terms of Use
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://help.netflix.com/legal/privacy"
          >
            Privacy
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://help.netflix.com/legal/corpinfo"
          >
            Corporate Information
          </a>
          <a target="_blank" rel="noreferrer" href="https://fast.com/">
            Speed Test
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://help.netflix.com/legal/notices"
          >
            Legal Notices
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.netflix.com/il-en/browse/genre/839338"
          >
            Only on Netflix
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
