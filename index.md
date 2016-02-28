# Css Screenposition

## As a pseudo-selector:
#### Example:
```css
.item:in-view {
	transform: translateX(0%);
}
```

#### Pros:
- Is specifically bound to the element
- Even when complete modules are moved at a new position on the site, the styles are only set when the element is in view

#### Cons:
- The styles can only be set immediately after the element is in view not when the element is in the middle of the screen
- The selector can be invalidated with its own styles
- On every scroll and paint event, all elements must be checked if they are in view
- X and Y axis can not be checked separately

## As a Queryselector:
#### Example:
```css
@screenPosition (minX: 100px, maxX: 200px + 100vh) {
	.item {
		transform: translateX(0%);
	}
}
```

#### Pros:
- More possibilities because of specific height declarations.
- No possibility of styles that invalidate the selector
- "Only" the scroll position must be checked on every scroll event

#### Cons:
- Must be changed when elements that you want to style moved up or down the page


# Todos:
- Queryselector implementation
