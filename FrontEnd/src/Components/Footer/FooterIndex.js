import React from "react";
import "./Footer.css";

export default function Footer({ children, ...restProps }) {
    return (
        <div className="footer-container" {...restProps}>
            {children}
        </div>
    );
}

Footer.Wrapper = function FooterWrapper({ children, ...restProps }) {
    return (
        <div className="footer-wrapper" {...restProps}>
            {children}
        </div>
    );
};
Footer.Row = function FooterRow({ children, ...restProps }) {
    return (
        <div className="footer-row" {...restProps}>
            {children}
        </div>
    );
};
Footer.Column = function FooterColumn({ children, ...restProps }) {
    return (
        <div className="footer-column" {...restProps}>
            {children}
        </div>
    );
};

Footer.LogoColumn = function FooterLogoColumn({ children, ...restProps }) {
    return (
        <div className="footer-logo-column" {...restProps}>
            {children}
        </div>
    );
};
Footer.Logo = function FooterLogo({ children, ...restProps }) {
    return (
        <img className="footer-logo" {...restProps}>
            {children}
        </img>
    );
};

Footer.Title = function FooterTitle({ children, ...restProps }) {
    return (
        <div className="footer-title" {...restProps}>
            {children}
        </div>
    );
};
Footer.Link = function FooterLink({ children, ...restProps }) {
    return (
        <a className="footer-link" {...restProps}>
            {children}
        </a>
    );
};

Footer.Horizontal = function FooterHorizontal({ children, ...restProps }) {
    return <hr className="footer-horizontalline" {...restProps} />;
};

Footer.Copyright = function FooterCopyright({ children, ...restProps }) {
    return (
        <span className="footer-copyright" {...restProps}>
            {children}
        </span>
    );
};

Footer.TermsAndPolicy = function FooterPrivacyPolicy({
    children,
    ...restProps
}) {
    return (
        <span className="footer-termspolicy" {...restProps}>
            {children}
        </span>
    );
};

Footer.TermsPolicy = function FooterPrivacyPolicy({ children, ...restProps }) {
    return (
        <a className="footer-termsandpolicy" {...restProps}>
            {children}
        </a>
    );
};
