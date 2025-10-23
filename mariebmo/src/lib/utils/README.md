# Card Styles Utility

Reusable card styling utility that provides consistent gradient card styles across the application.

## Usage

### Basic Example

```typescript
import { CardColor, getCardClasses } from '$lib';

const cardClasses = getCardClasses({
	color: CardColor.PINK,
	variant: 'outline',
	rounded: 'lg',
	hover: true,
	shadow: true
});
```

```svelte
<div class="p-6 {cardClasses}">
	<h2>Card Title</h2>
	<p>Card content</p>
</div>
```

### Available Colors

- `CardColor.PINK`
- `CardColor.ORANGE`
- `CardColor.BLUE`
- `CardColor.GREEN`
- `CardColor.RED`
- `CardColor.YELLOW`
- `CardColor.PURPLE`
- `CardColor.WHITE`

### Variants

- `'filled'` - Solid gradient background with white text
- `'outline'` - Border with light gradient background

### Options

```typescript
interface CardStyleOptions {
	color?: CardColor; // Default: CardColor.PINK
	variant?: CardVariant; // Default: 'outline'
	hover?: boolean; // Default: true
	shadow?: boolean; // Default: true
	rounded?: 'sm' | 'md' | 'lg' | 'xl'; // Default: 'lg'
}
```

### Examples

#### Outlined Card with Hover Effect

```typescript
const classes = getCardClasses({
	color: CardColor.BLUE,
	variant: 'outline',
	hover: true
});
```

#### Filled Card without Shadow

```typescript
const classes = getCardClasses({
	color: CardColor.PURPLE,
	variant: 'filled',
	shadow: false
});
```

#### Rounded XL Card

```typescript
const classes = getCardClasses({
	color: CardColor.GREEN,
	rounded: 'xl'
});
```

## Where It's Used

- **ProjectCard.svelte** - Project cards on the homepage
- **About page** - Main content card
- Can be used anywhere you need consistent card styling
