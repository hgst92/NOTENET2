function homeView() {
    const user = model.users.find(user => user.id === model.app.currentUser);
    
    return /*HTML*/ `
        <div class="home-page">
            <section class="home-hero">
                <span class="home-hero__eyebrow">Velkommen til NoteNet</span>
                <h1>Organiser livet ditt</h1>
                <p>Lag lister, del med andre, og få bedre kontroll på hverdagen</p>

                <div class="home-hero__actions">
                  ${!user ? `
                    
                                        <button type="button">Registrer deg</button>
                  ` : ''}
                </div>
            </section>
            <section class="home-feature-grid" aria-label="Listetyper">
                <article class="home-feature-card">
                    <div class="home-feature-card__icon" aria-hidden="true">🛒</div>
                    <h3>Handlelister</h3>
                    <p>Organiser handleturene dine effektivt</p>
                </article>
                <article class="home-feature-card">
                    <div class="home-feature-card__icon" aria-hidden="true">💙</div>
                    <h3>Ønskelister</h3>
                    <p>Hold oversikt over ønsker og drømmer</p>
                </article>
                <article class="home-feature-card">
                    <div class="home-feature-card__icon" aria-hidden="true">🔔</div>
                    <h3>Huskelister</h3>
                    <p>Glem aldri viktige ting igjen</p>
                </article>
                <article class="home-feature-card">
                    <div class="home-feature-card__icon" aria-hidden="true">☑</div>
                    <h3>To-do lister</h3>
                    <p>Få oversikt over oppgaver</p>
                </article>
            </section>
            ${!user || user.role !== "Premium" ? `
            <section class="home-premium-card">
                <h2>Premium-funksjoner</h2>
                <p>Få tilgang til alle funksjoner</p>
                <ul>
                    <li>Opprett ubegrensede lister</li>
                    <li>Del lister med andre brukere</li>
                    <li>Kontroller tilganger og rettigheter</li>
                </ul>
                <span class="home-premium-chip">Oppgrader til Premium</span>
            </section>
            ` : ''}
        </div>
    
    `;
}