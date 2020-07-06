---
title: Combo box
parent: Form controls
order: 03
lead: A combo box helps users select an item from a large list of options.
---

{% include code/preview.html component="combo-box" %}
{% include code/accordion.html component="combo-box" %}

<div class="usa-accordion usa-accordion--bordered site-accordion-docs">
  <button class="usa-button-unstyled usa-accordion__button"
      aria-expanded="true" aria-controls="combo-box-docs">
    Guidance
  </button>
  <div id="combo-box-docs" aria-hidden="false" class="usa-accordion__content site-component-usage">
    <h4>When to use the combo box component</h4>
    <ul class="usa-content-list">
      <li><strong>More than 15 options.</strong> When there are more than 15 choices in a drop-down list it can be hard to navigate with scrolling only.</li>
      <li><strong>Limited space.</strong> Use a combo box for presenting options when screen real estate is limited.</li>
    </ul>
    <h4>When to consider something else</h4>
    <ul class="usa-content-list">
      <li><strong>Limited choices.</strong> When the number of options is small you can continue to use a <code>select</code> or <code>radio</code> elements.</li>
    </ul>
    <h4>Usability guidance</h4>
    <ul class="usa-content-list">
      <li><strong>Use option strings familiar to users.</strong> The combo box filters by matching strings. Include option text that includes familiar strings or spellings (i.e. if using the combobox with a state list, include the postal abbreviation in the option text: <code>District of Columbia (DC)</code>).</li>
      <li><strong>Make sure to test.</strong> Test dropdowns thoroughly with members of your target audience. Several usability experts suggest they should be the “UI of last resort.” Many users find them confusing and difficult to use.</li>
      <li><strong>Avoid dependent options.</strong> Avoid making options in one dropdown menu change based on the input to another. Users often don’t understand how selecting an item in one impacts another.</li>
      <li><strong>Use a good default.</strong> When most users will (or should) pick a particular option, make it the default: <code>&lt;option selected=<wbr>"selected"&gt;Default<wbr>&lt;/option&gt;</code></li>
      <li><strong>Avoid auto-submission.</strong> Don’t use JavaScript to automatically submit the form (or do anything else) when an option is selected. Offer a “submit” button at the end of the form instead. Users often change their choices multiple times. Auto-submission is also less accessible.</li>
    </ul>
    <h4 class="usa-heading">Accessibility</h4>
    <ul class="usa-content-list">
      <li><strong>Customize accessibly.</strong> If you customize the combo box, ensure it continues to meet the the <a href="{{ site.baseurl }}/form-controls/"> accessibility requirements that apply to all form controls.</a></li>
      <li><strong>Always use a label.</strong> Make sure your dropdown has a label. Don’t replace it with the default menu option (for example, removing the “State” label and just having the dropdown read “Select a state” by default).</li>
      <li><strong>Avoid auto-submission.</strong> Don’t use JavaScript to automatically submit the form (or do anything else) when an option is selected. Auto-submission disrupts screen readers because they select each option as they read them.</li>
    </ul>
    <h4 class="usa-heading">Implementation</h4>
<div class="usa-prose site-prose" markdown="1">

{:.usa-content-list}

- **Initialization properties.**  There are properties available that will update the component during initialization. These properties must be set before the component is initialized in order to have an affect.

| property | element | effect |
| --- | --- | ---
required | select | The combo box component will be required in terms of native form validation.
disabled | select | The combo box component will be disabled / readonly. You can re-enable by executing the enable procedure on the component.
data-placeholder | .usa-combo-box | To update the placeholder text of the combo-box use the `data-placeholder` attribute. Is it recommended that a label or hint is used in lieu of a placeholder.
data-default-value | .usa-combo-box | The combo box will set this value as the default selection if it is found within the select options.

{:.usa-content-list}

- **Additional component procedures.**  There are static procedures available that can update the component after initialization. These procedures are in addition to the primary methods referenced in the  <a href="{{ site.baseurl }}/documentation/developers/#js-customization">JS customization</a>

| procedure | parameters | effect |
| --- | --- | ---
enable | .usa-combo-box element | The combo box component will be enabled.
disable | .usa-combo-box element | The combo box component will be disabled / readonly.

</div>
    <h4 class="usa-heading">Package information</h4>
    <ul class="usa-content-list">
      <li>
        <strong>Package usage:</strong> <code>@import form-controls</code>
      </li>
      <li>
        <strong>Requires:</strong> <code>required</code>, <code>global</code>
      </li>
    </ul>
  </div>
</div>
