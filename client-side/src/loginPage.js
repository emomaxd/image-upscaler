import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here
    // You can use the form input values to perform authentication

    // Assuming the login was successful, you can call the onLogin prop
    // and pass any necessary data to the parent component
    const userData = {
      username: 'JohnDoe',
      email: 'johndoe@example.com',
    };
    onLogin(userData);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Implement your signup logic here
    // You can use the form input values to create a new user

    // Assuming the signup was successful, you can call the onLogin prop
    // and pass any necessary data to the parent component
    const userData = {
      username: 'NewUser',
      email: 'newuser@example.com',
    };
    onLogin(userData);
  };

  const toggleForm = () => {
    setShowSignup((prevShowSignup) => !prevShowSignup);
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <div className="giris">
      <div className="form">
        {showSignup ? (
          <form className="kayit" onSubmit={handleSignup}>
            <input type="text" placeholder="Adınız" />
            <input type="password" placeholder="Şifreniz" />
            <input type="text" placeholder="Mail Adresiniz" />
            <button type="submit">Oluştur</button>
            <p className="mesaj">
              Zaten Üye Misin?{' '}
              <a href="#!" onClick={toggleForm}>
                Giriş Yap
              </a>
            </p>
          </form>
        ) : null}
        {showLogin ? (
          <form className="giris-from" onSubmit={handleLogin}>
            <input type="text" placeholder="Adınız" />
            <input type="password" placeholder="Şifreniz" />
            <button type="submit">Giriş Yap</button>
            <p className="mesaj">
              Üye Değil Misin?{' '}
              <a href="#!" onClick={toggleForm}>
                Hesap Oluştur
              </a>
            </p>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default LoginPage;
