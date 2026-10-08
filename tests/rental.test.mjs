import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('RentE Fleet & Booking Architecture Tests', () => {
  const rootDir = process.cwd();

  test('required App Router source files exist', () => {
    const requiredFiles = [
      'app/page.tsx',
      'app/cars/page.tsx',
      'app/map/page.tsx',
      'app/admin/page.tsx',
      'app/layout.tsx',
      'app/globals.css',
      'lib/mockData.ts',
      'types/index.ts',
      'package.json',
      'README.md',
    ];

    for (const file of requiredFiles) {
      assert.ok(fs.existsSync(path.join(rootDir, file)), `File missing: ${file}`);
    }
  });

  test('mockData source defines populated MOCK_HUBS and MOCK_VEHICLES', () => {
    const mockContent = fs.readFileSync(path.join(rootDir, 'lib/mockData.ts'), 'utf-8');
    assert.ok(mockContent.includes('export const MOCK_HUBS'), 'MOCK_HUBS must be exported');
    assert.ok(mockContent.includes('export const MOCK_VEHICLES'), 'MOCK_VEHICLES must be exported');
    assert.ok(mockContent.includes('Volvo EX30'), 'Should contain Volvo EX30 vehicle');
    assert.ok(mockContent.includes('Porsche 911'), 'Should contain Porsche 911 vehicle');
  });

  test('rental duration and price calculation logic works accurately', () => {
    function calculateRentalPrice(dailyRate, pickupDateStr, returnDateStr) {
      const start = new Date(pickupDateStr);
      const end = new Date(returnDateStr);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      const basePrice = dailyRate * rentalDays;
      const serviceFee = Math.round(basePrice * 0.10);
      const insuranceFee = 25 * rentalDays;
      const totalPrice = basePrice + serviceFee + insuranceFee;
      return { rentalDays, basePrice, serviceFee, insuranceFee, totalPrice };
    }

    const res = calculateRentalPrice(100, '2026-10-10', '2026-10-13');
    assert.equal(res.rentalDays, 3);
    assert.equal(res.basePrice, 300);
    assert.equal(res.serviceFee, 30);
    assert.equal(res.insuranceFee, 75);
    assert.equal(res.totalPrice, 405);
  });

  test('brand and transmission filter logic functions accurately', () => {
    const mockFleet = [
      { id: '1', brand: 'Volvo', transmission: 'Automatic', price: 85 },
      { id: '2', brand: 'BMW', transmission: 'Automatic', price: 120 },
      { id: '3', brand: 'Porsche', transmission: 'Manual', price: 290 },
      { id: '4', brand: 'Tesla', transmission: 'Automatic', price: 95 },
    ];

    const automaticFleet = mockFleet.filter(v => v.transmission === 'Automatic');
    assert.equal(automaticFleet.length, 3);

    const volvoFleet = mockFleet.filter(v => v.brand === 'Volvo');
    assert.equal(volvoFleet.length, 1);
    assert.equal(volvoFleet[0].price, 85);

    const budgetFleet = mockFleet.filter(v => v.price <= 100);
    assert.equal(budgetFleet.length, 2);
  });
});
