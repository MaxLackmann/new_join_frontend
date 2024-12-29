/**
 * Renders a contact list item.
 * @param {object} contact - The contact object to render.
 * @return {string} The HTML string representing the contact list item.
 */
function renderListContactHTML(contact, i) {
  return /*html*/ `
    <div id="contact-${contact.id}" class="contact-list-container ${i}" onclick="showDetails(${contact.id}, 'contact')">
      <div class="contact-emblem" style="background-color: ${contact.color}">
        ${contact.emblem}
      </div>
      <div class="contact-info-container">
        <p>${contact.name}</p>
        <a>${contact.email}</a>
      </div>
    </div>
  `;
}

/**
 * Renders the HTML for the user container, which displays the user's emblem and name.
 * @param {object} user - The user object containing the user's information.
 * @return {string} The HTML string representing the user container.
 */
function renderUserContainerHTML(profile) {
  return /*html*/ `
    <div class="logged-user" onclick="showDetails(${profile.id}, 'profile')">
      <div class="contact-emblem" style="background-color: ${profile.color}">
        ${profile.emblem}
      </div>
      <div class="user-name">
        <p class="current-user-text">Current User</p>
        <p>${profile.username}</p>
      </div>
    </div>
  `;
}

/**
 * Renders detailed view of a contact.
 * @param {object} contact - Das Kontaktobjekt.
 * @return {string} Das HTML f端r die Detailansicht.
 */
/**
 * Renders the detailed view for a profile or contact.
 * @param {object} detail - The detail object (profile or contact).
 * @param {string} type - The type of detail ('profile' or 'contact').
 * @return {string} The HTML for the detail view.
 */
function renderDetailsHTML(detail, type) {
  let actions = getDetailActions(type, detail.id);

  return /*html*/ `
    <div class="headline-contact">
      <div class="emblem-info-container">
        <div class="emblem-container">
          <div class="emblem-info" id="emblem" style="background-color: ${
            detail.color
          }">
            ${detail.emblem}
          </div>
          <div class="name-contact">
            <p id="name_contact">${detail.name || detail.username}</p>
            <div class="a-name-contact" id="a_nameContact">
              <a class="dflex-align-center" onclick="${actions.edit}">
                <img class="img-btns" src="../assets/icons/edit-contacts_icon.svg"> Edit
              </a>
              <a class="dflex-align-center" onclick="${actions.delete}">
                <img class="img-btns" src="../assets/icons/delete_contact_icon.svg"> Delete
              </a>
            </div>
          </div>
        </div>
        <div class="mobile-contact">
          <div class="three-dots-button" onclick="toggleActive(this)">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
          <div class="mobile-dropdown-menu" id="amobile_nameContact" style="display:none">
            <a class="dflex-align-center" onclick="${actions.edit}">
              <img class="img-btns" src="../assets/icons/edit-contacts_icon.svg"> Edit
            </a>
            <a class="dflex-align-center" onclick="${actions.delete}">
              <img class="img-btns" src="../assets/icons/delete_contact_icon.svg"> Delete
            </a>
          </div>
        </div>
      </div>
      <div class="info">${actions.infoTitle}</div>
      <div class="contact-information">
        <div><b>Email</b></div>
        <a id="email_contact">${detail.email}</a>
        <div><b>Phone</b></div>
        <div id="phone_contact">${detail.phone}</div>
      </div>
    </div>
  `;
}

/**
 * Renders a dialog for editing the user profile.
 * @param {object} user - The user object.
 * @return {string} HTML for the user dialog.
 */
function renderProfileDialog(profile) {
  return /*html*/ `
  <div class="dialog">
    <div class="join-add-contact">
      <button class="button-mobile-close" onclick="closeDialog()">
        <img class="imgBtns" src="../assets/icons/closeWhite_icon.svg">
      </button>
      <img class="icon-join-contact" src="../assets/icons/joinWhite.svg">
      <div class="contact-details-title">Edit User Profile</div>
      <div id="textAdd" class="add-text">Update your personal information</div>
      <div class="seperator-add"></div>
    </div>

    <div class="emblem-info" id="emblem" style="background-color: ${profile.color}">
      ${profile.emblem}
    </div>
    
    <div class="form-edit-style">
      <form class="add-contact-form" onsubmit="editProfile(event, ${profile.id})">
        <div class="group-contact-input">
          <input class="inputs-contact inputfield-text-style" type="text" id="nameProfile" placeholder="Username" value="${profile.username}" required />
          <input class="inputs-contact inputfield-text-style" type="email" id="emailProfile" placeholder="Email" value="${profile.email}" required />
          <input class="inputs-contact inputfield-text-style" type="tel" id="phoneProfile" placeholder="Phone" value="${profile.phone}" required />
          <div class="form-button">
            <button class="button-guest button-text-style" type="button" onclick="closeDialog()">Cancel</button>
            <button class="add-contact-button-mobile button-text-style" type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>`;
}

/**
 * Renders a contact dialog for adding or editing a contact.
 * @param {string} mode - 'add' oder 'edit'.
 * @param {object} [contact] - Das Kontaktobjekt (nur für 'edit' Modus).
 * @param {number} [index] - Der Index des Kontakts (nur für 'edit' Modus).
 * @return {string} Das HTML für den Dialog.
 */
function renderContactDialog(contact) {
  return /*html*/ `
  <div class="dialog">
    <div class="join-add-contact">
      <button class="button-mobile-close" onclick="closeDialog()">
        <img class="imgBtns" src="../assets/icons/closeWhite_icon.svg">
      </button>
      <img class="icon-join-contact" src="../assets/icons/joinWhite.svg">
      <div class="contact-details-title">Edit Contact</div>
      <div id="textAdd" class="add-text">Update personal information</div>
      <div class="seperator-add"></div>
    </div>

    <div class="emblem-info" id="emblem" style="background-color: ${contact.color}">
      ${contact.emblem}
    </div>

    <div class="form-edit-style">
      <form class="add-contact-form" onsubmit="editContact(event, ${contact.id})">
        <div class="group-contact-input">
          <input class="inputs-contact inputfield-text-style" type="text" id="nameContact" placeholder="name" value="${contact.name}" required />
          <input class="inputs-contact inputfield-text-style" type="email" id="emailContact" placeholder="Email" value="${contact.email}" required />
          <input class="inputs-contact inputfield-text-style" type="tel" id="phoneContact" placeholder="Phone" value="${contact.phone}" required />
          <div class="form-button">
            <button class="button-guest button-text-style" type="button" onclick="closeDialog()">Cancel</button>
            <button class="add-contact-button-mobile button-text-style" type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>`;
}

function renderAddContactDialog() {
  return /*html*/ `
  <div class="dialog">
    <div class="join-add-contact">
      <button class="button-mobile-close" onclick="closeDialog()">
        <img class="imgBtns" src="../assets/icons/closeWhite_icon.svg">
      </button>
      <img class="icon-join-contact" src="../assets/icons/joinWhite.svg">
      <div class="contact-details-title">Contact</div>
      <div id="textAdd" class="add-text">Add a new Contact</div>
      <div class="seperator-add"></div>
    </div>
    <div class="form-edit-style">
      <form class="add-contact-form" onsubmit="newContact(event)">
        <div class="group-contact-input">
          <input class="inputs-contact inputfield-text-style" type="text" id="nameContact" placeholder="name" required />
          <input class="inputs-contact inputfield-text-style" type="email" id="emailContact" placeholder="Email" required />
          <input class="inputs-contact inputfield-text-style" type="tel" id="phoneContact" placeholder="Phone" required />
          <div class="form-button">
            <button class="button-guest button-text-style" type="button" onclick="closeDialog()">Cancel</button>
            <button class="add-contact-button-mobile button-text-style" type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>`;
}
