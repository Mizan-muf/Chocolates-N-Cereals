# Chocolates & Cereals - Workflow + Build Document

Last updated: February 17, 2026

## 1. Current product direction
- Brand blend: airy editorial nutrition aesthetic + bold green ingredient-forward accents.
- Market focus: Udaipur-first delivery model.
- Positioning: practical daily fuel (cereals) + indulgent but mindful treats (chocolates).

## 2. Frontend status (implemented)
- Stack: Next.js App Router + Tailwind + Framer Motion.
- Home page is now a polished marketing flow with animated sections and stronger visual hierarchy.
- Conversion priority is shop-first with blog as secondary path.

### Home page composition
- Hero: split editorial layout, trust strip, animated motif/mesh backdrop, primary shop CTA.
- Brand ticker: animated highlight rail for delivery and product promises.
- Category block: three visual value cards with hover lift and icon treatment.
- Featured products: three-card spotlight with badges and clear product CTA.
- Story + final CTA: textured narrative panel and final action cluster.

### Key files
- `frontend/app/page.tsx`
- `frontend/app/globals.css`
- `frontend/components/sections/HomeHero.tsx`
- `frontend/components/sections/HomeTicker.tsx`
- `frontend/components/sections/HomeCategories.tsx`
- `frontend/components/sections/HomeFeatured.tsx`
- `frontend/components/sections/HomeStoryCta.tsx`
- `frontend/components/motion/MotionReveal.tsx`
- `frontend/components/motion/motionVariants.ts`
- `frontend/components/ui/Button.tsx`
- `frontend/components/ui/Card.tsx`

## 3. Design system baseline
- Base surfaces: warm oat neutrals for calm readability.
- Primary accent: saturated green for interactive focus and conversion.
- Secondary accent: cocoa brown for premium food identity.
- Motifs: repeated illustrated botanical texture in hero and section containers.
- Motion: reveal/stagger transitions and low-amplitude ambient animation.
- Accessibility: respects `prefers-reduced-motion` with reduced animation behavior.

## 4. Application information architecture

### Public routes
- `/` Home
- `/blogs` Blog index
- `/blogs/[slug]` Blog detail
- `/products` Product listing
- `/products/[slug]` Product detail
- `/preferences` Preference form
- `/checkout` Checkout
- `/order/[id]` Order status

### Admin routes
- `/admin` Dashboard
- `/admin/blogs` Blog CRUD
- `/admin/products` Product CRUD
- `/admin/orders` Order operations
- `/admin/media` Upload/media management

## 5. Backend architecture plan
- Framework: NestJS REST API.
- Persistence: Postgres + Prisma.
- Payments: hosted checkout with signature-verified webhook.
- Email: Resend transactional notifications.
- Media: Cloudflare R2 presigned uploads.
- Auth: admin JWT in secure HttpOnly cookie.

## 6. Operating workflow
1. Define page intent and conversion target before writing UI.
2. Implement reusable primitives first (`Button`, `Card`, motion wrappers).
3. Compose page sections from reusable building blocks.
4. Run `npm run lint` and `npm run build` after each substantial UI pass.
5. Keep copy and placeholders static until CMS/data wiring starts.

## 7. Quality gates
- Lint must pass with no new errors.
- Build must pass with static generation intact.
- Keyboard focus states must remain visible on all controls.
- Motion must degrade for reduced-motion users.
- Layout must hold at 360, 768, 1280, and 1440 widths.

## 8. Next planned implementation tasks
1. Apply the same visual language to `/products` and `/blogs`.
2. Replace featured placeholders with real product data cards.
3. Add photography blocks once approved media assets are ready.
4. Introduce cart + checkout UI with the same motion and typography system.