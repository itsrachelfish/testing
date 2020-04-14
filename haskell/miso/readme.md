# miso-from-html usage notes
These are my notes from using https://github.com/dmjio/miso-from-html

Example input files can be found in the `examples` directory

## Input
- Some elements need a closing tag, even if they aren't actually required in HTML or by miso
  - When this happens, you will see the error `not enough input`
  - If there are two elements with missing closing tags you will confusingly see the word `string`
  - Elements that work without a closing tag
    - `<meta>`
    - `<img>`
    - `<br>`
    - `<hr>`
  - Elements that unnecessarily require a closing tag
    - `<input>`
    - `<source>` (HTML5 audio / video)
- Self-closing tags are unsupported and will result in the `string` error
  - For example `<img>` works but `<img />` does not
- Input HTML must be wrapped in a single container element
  - In certain cases only the first element in a document will be converted to miso
    - When this happens, all other elements are silently ignored
  - Other times you'll just get the message `string`, I don't really understand why this happens but it may be related to indentation
- Indentation matters, sometimes
  - Most of the time indentation is ignored
  - However, a child element placed at the beginning of a line without any whitespace can result in either `not enough input` or `string`

## Output
- Miso does not support all HTML attributes, but miso-from-html will happily turn any HTML you give it into miso syntax
  - The output from miso-from-html is not guaranteed to actually run
- Examples of unsupported elements & attributes with resulting error messages:

### `<a data-toggle="dropdown">`

Data attributes are converted into miso, but it does not appear that miso actually supports hyphenated element names

```
    parse error on input ‘data’
    |
    |   , data-toggle_ "dropdown"
    |     ^^^^
```

### `<input></input>`

miso-from-html requires a closing tag for inputs however miso itself does not expect any text content for input elements and returns an error

```
Couldn't match expected type ‘[a0] -> View Action’ with actual type ‘View action0’
   • The function ‘input_’ is applied to two arguments,
     but its type ‘[Attribute action0] -> View action0’ has only one
     In the expression:
       input_
         [type_ "checkbox", class_ "custom-control-input"]
         []
```

### `<input type="checkbox" checked>`

This doesn't result in an error, but the output is not ideal. Replacing `textProp "checked" ""` with `checked_ True` is better, since this allows you to actually change the value to false.

```
[ input_
   [ type_ "checkbox"
   , textProp "checked" ""
   ]
]
```
