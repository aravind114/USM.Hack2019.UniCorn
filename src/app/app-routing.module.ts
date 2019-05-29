import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { UsmEventsComponent } from './usm-events/usm-events.component';
import { UsmEventDetailComponent } from './usm-event-detail/usm-event-detail.component';
import { UsmEventAddComponent } from './usm-event-add/usm-event-add.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'product-details/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Details' }
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
    data: { title: 'Add Product' }
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: { title: 'Edit Product' }
  },
  { path: '',
    redirectTo: '/usm-events',
    pathMatch: 'full'
  },
   {
    path: 'usm-events',
    component: UsmEventsComponent,
    data: { title: 'List of Events' }
  },
  {
    path: 'usm-event-details/:id',
    component: UsmEventDetailComponent,
    data: { title: 'Event Details' }
  },
  {
    path: 'usm-event-add',
    component: UsmEventAddComponent,
    data: { title: 'Add Event' }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
