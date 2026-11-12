"""Reference data for the Buea demo. Coordinates and price bands are demo assumptions, not surveyed."""

# quarter -> approximate (lat, lng) centroid
QUARTERS = {
    "Molyko": (4.158, 9.290),
    "Great Soppo": (4.150, 9.262),
    "Bonduma": (4.152, 9.277),
    "Buea Town": (4.165, 9.232),
    "Bokwango": (4.140, 9.225),
    "Muea": (4.172, 9.305),
    "Mile 16": (4.135, 9.310),
    "Mile 17": (4.147, 9.300),
    "Sandpit": (4.157, 9.270),
    "Clerks' Quarters": (4.158, 9.245),
}


def _t(en, fr, band, problems):
    return {"en": en, "fr": fr, "band": band,
            "problems": [{"id": i, "en": e, "fr": f} for i, e, f in problems]}


# band = typical price range in XAF for a small job
TRADES = {
    "tailor": _t("Tailor", "Couturier", (3000, 15000), [
        ("sew", "Sew a new outfit", "Coudre une tenue"),
        ("alter", "Adjust or repair clothes", "Retoucher ou réparer"),
        ("uniform", "School or work uniforms", "Uniformes"),
    ]),
    "electrician": _t("Electrician", "Électricien", (5000, 15000), [
        ("socket", "Socket or switch problem", "Problème de prise ou d'interrupteur"),
        ("outage", "No power in the house", "Plus de courant à la maison"),
        ("install", "Install lights or wiring", "Installer lampes ou câblage"),
    ]),
    "plumber": _t("Plumber", "Plombier", (4000, 12000), [
        ("leak", "Leaking pipe or tap", "Fuite de tuyau ou robinet"),
        ("blocked", "Blocked drain or toilet", "Canalisation ou WC bouché"),
        ("install", "Install tank, sink or toilet", "Installer cuve, évier ou WC"),
    ]),
    "mechanic": _t("Mechanic", "Mécanicien", (5000, 25000), [
        ("nostart", "Car or bike will not start", "Véhicule ne démarre pas"),
        ("service", "Service or oil change", "Entretien ou vidange"),
        ("brakes", "Brakes or tyres", "Freins ou pneus"),
    ]),
    "mason": _t("Mason", "Maçon", (10000, 40000), [
        ("crack", "Repair cracks or plaster", "Réparer fissures ou crépi"),
        ("tiles", "Lay tiles", "Poser du carrelage"),
        ("wall", "Build a wall or fence", "Construire un mur"),
    ]),
    "carpenter": _t("Carpenter", "Menuisier", (5000, 30000), [
        ("door", "Door, window or lock", "Porte, fenêtre ou serrure"),
        ("furniture", "Make or repair furniture", "Fabriquer ou réparer un meuble"),
        ("roof", "Roof or ceiling work", "Toiture ou plafond"),
    ]),
    "hairdresser": _t("Hairdresser", "Coiffeur", (1000, 10000), [
        ("braids", "Braids or weaving", "Tresses ou tissage"),
        ("cut", "Haircut or shave", "Coupe ou rasage"),
        ("home", "Home visit for an event", "À domicile pour un évènement"),
    ]),
}

URGENCIES = ("now", "today", "week")
CIRCLES = ("trade", "community")
RELATIONS = ("trained", "hired", "quarter")
CUSTOMER_TAGS = ("on_time", "price_kept", "clean", "respectful", "hire_again")
ARTISAN_TAGS = ("paid_as_agreed", "respectful", "safe_site")
