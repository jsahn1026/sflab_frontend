import './index.scss';

function Footer() {
  return (
    <footer>
      <small>
        &copy; {new Date().getFullYear()}{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://sflab.co.kr">
          S.F.Lab
        </a>
      </small>
    </footer>
  );
}

export default Footer;
