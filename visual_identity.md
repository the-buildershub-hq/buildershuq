# Builders Hub — Visual Identity Guidelines

This document outlines the visual system for Builders Hub to ensure all digital touchpoints remain premium, cohesive, and aligned with our commitment to digital artistry.

---

## 1. Color Palette

Our colors reflect structure, intelligence, and high-end craftsmanship.

| Color | Hex Code | Tailwind Equivalent | Purpose / Application |
| :--- | :--- | :--- | :--- |
| **Brand Navy (Primary)** | `#0f2240` | `bg-brand-navy` / `brand-900` | Headings, active primary UI elements, logos, buttons. |
| **Accent Navy (Hover)** | `#1a355f` | `brand-800` / `brand-navy-hover` | Hover states, active links, secondary accents. |
| **Off-White (Background)**| `#f9fafb` | `bg-zinc-50` / `bg-zinc-100` | Main application background (clean canvas). |
| **Pure White** | `#ffffff` | `bg-white` | Cards, navigation container background. |
| **Slate Gray** | `#52525b` | `text-zinc-600` | Body typography and secondary descriptive text. |

---

## 2. Typography

We use highly readable, geometric, and clean typefaces to signal detail-oriented engineering.

* **Primary Font (Headings & Body)**: **Figtree**
  * *Characteristics*: Contemporary, friendly yet structured sans-serif.
  * *Application*: Used for all primary interface text, headers, and UI copy.
* **Secondary Font (Monospace)**: **Geist Mono**
  * *Characteristics*: High-performance, clean monospace.
  * *Application*: Numbers, tech-stack lists, system metrics, and UI detail tags.

---

## 3. Layout & Structure Principles

* **Minimalism Over Noise**: Embrace negative space. Give components room to breathe to maintain a high-end, gallery-like aesthetic.
* **Flat Structure & Subtlety**: Structure should feel lightweight. Avoid heavy drop-shadows; instead, use fine borders (`border-zinc-200/50`) and glassmorphic blur effects (`backdrop-blur-md`) to separate layers.
* **Floating Containers**: Crucial navigation and action cards float inside the canvas, featuring rounded corners (`rounded-full` or `rounded-2xl`) to appear modern and modular.

---

## 4. Iconography

* **Library**: Google Material Symbols (Outlined version).
* **Styling**: Utilizes variable font properties:
  * **Fill**: Off (`0`) by default; toggled on (`1`) for active/hover states.
  * **Weight**: Set to `500` or `600` for crisp display on high-DPI screens.
  * **Sizing**: Kept compact (typically `text-sm` or `text-lg`) to balance with adjacent typography.

---

## 5. Motion Principles (Framer Motion)

Motion is a differentiator. Every transition must feel premium, fluid, and intentional:
* **Micro-interactions**: Interactive elements (like CTA buttons) should have slight displacement animations (e.g., arrow shifting up-right on hover: `group-hover:translate-x-0.5 group-hover:-translate-y-0.5`).
* **Page Load**: Elements should enter the viewport using spring animations rather than linear fades (e.g., `y: 0` from `y: 30` with `easeOut` easing).
