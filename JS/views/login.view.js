function logInPage() {
    return `
<div style="display:flex; justify-content:space-between; padding:40px;">

<!-- VENSTRE: LOGG INN -->
<div style="width:30%;">
<h2>Logg inn</h2>

<p>Brukernavn:</p>
<input oninput="model.inputs.logInPage.email = this.value" />

<p>Passord:</p>
<input type="password" oninput="model.inputs.logInPage.password = this.value" />

<br><br>


<button onclick="toggleForgotPassword()">Glemt passord</button>
<button onclick="login()">Logg inn</button>
<!-- 👇🏼 GLEMT PASSORD FELT -->
${model.app.showForgotPassword ? `
    <div style="margin-top:15px;">
    <p>Skriv inn e-post:</p>
    <input oninput="model.inputs.forgottenPasswordPopUp.confirmEmail = this.value" />

    <button onclick="sendReset()">Send</button>
    </div>

`: "" }
</div>



<!-- MIDT: STREK -->
<div style="border-left: 1px solid black; height:300px;"></div>

<!-- HØYRE: REGISTRER -->
<div style="width:30%;">
    <h2>Registrer deg</h2>

    <p>E-postadresse:</p>
    <input oninput="model.inputs.registerPage.email = this.value" />

    <p>Passord</p>
    <input type="password" oninput="model.inputs.registerPage.password = this.value" />

    <p>Bekreft passord:</p>
    <input type="password" oninput="model.inputs.registerPage.confirmPassword = this.value" />

    <br><br>

   
    <button onclick="register()">Registrer deg</button>
</div>

<!-- PREMIUM -->
<div style="width:20%;">
    <p>Kjøp premium nå!</p>
    <button>Vipps</button>
</div>

</div>
`;
}