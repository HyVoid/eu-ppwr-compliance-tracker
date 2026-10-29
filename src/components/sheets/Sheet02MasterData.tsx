import React, { useState } from 'react';
import {
  ComputedPackagingComponentMaster,
  PackagingComponentMaster,
  PackagingTier,
  MaterialCategory,
} from '../../types/ppwr';
import { StatusBadge } from '../StatusBadge';
import { InsightBlock } from '../InsightBlock';
import {
  Boxes,
  Plus,
  Trash2,
  Search,
  Filter,
  Download,
} from 'lucide-react';
import { arrayToCSV, downloadCSV } from '../../utils/csvHelper';

interface Sheet02MasterDataProps {
  computedComponents: ComputedPackagingComponentMaster[];
  onUpdateComponent: (componentId: string, updated: Partial<PackagingComponentMaster>) => void;
  onAddComponent: (comp: PackagingComponentMaster) => void;
  onDeleteComponent: (componentId: string) => void;
}

export const Sheet02MasterData: React.FC<Sheet02MasterDataProps> = ({
  computedComponents,
  onUpdateComponent,
  onAddComponent,
  onDeleteComponent,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for adding new component
  const [newComp, setNewComp] = useState<PackagingComponentMaster>({
    componentId: `CMP-${String(computedComponents.length + 1).padStart(3, '0')}`,
    productId: 'PRD-01',
    productName: 'Luminescent Glow Serum 50ml',
    packagingId: 'PKG-01-PRI',
    tier: 'Primary Packaging',
    componentName: '',
    materialCategory: 'Glass',
    manufacturerName: '',
    legalEntitySigner: 'Aura Care EU B.V. (Elena Rossi)',
  });

  const productList = Array.from(new Set(computedComponents.map((c) => c.productId))).sort();

  const filteredComponents = computedComponents.filter((comp) => {
    if (selectedProduct !== 'ALL' && comp.productId !== selectedProduct) return false;
    if (selectedTier !== 'ALL' && comp.tier !== selectedTier) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        comp.componentId.toLowerCase().includes(q) ||
        comp.componentName.toLowerCase().includes(q) ||
        comp.productName.toLowerCase().includes(q) ||
        comp.manufacturerName.toLowerCase().includes(q) ||
        comp.materialCategory.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    const header = [
      'componentId',
      'productId',
      'productName',
      'packagingId',
      'tier',
      'componentName',
      'materialCategory',
      'manufacturerName',
      'legalEntitySigner',
      'keyUniqueCheck',
      'applicableRulesCount',
      'dataIntakeStatus',
      'productComponentCount',
    ];
    const rows = filteredComponents.map((c) => [
      c.componentId,
      c.productId,
      c.productName,
      c.packagingId,
      c.tier,
      c.componentName,
      c.materialCategory,
      c.manufacturerName,
      c.legalEntitySigner,
      c.keyUniqueCheck,
      c.applicableRulesCount,
      c.dataIntakeStatus,
      c.productComponentCount,
    ]);
    downloadCSV('sheet02_product_packaging_master.csv', arrayToCSV([header, ...rows]));
  };

  const handleSaveNewComponent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComp.componentId || !newComp.componentName) return;
    onAddComponent(newComp);
    setIsAddModalOpen(false);
    setNewComp({
      componentId: `CMP-${String(computedComponents.length + 2).padStart(3, '0')}`,
      productId: 'PRD-01',
      productName: 'Luminescent Glow Serum 50ml',
      packagingId: 'PKG-01-PRI',
      tier: 'Primary Packaging',
      componentName: '',
      materialCategory: 'Glass',
      manufacturerName: '',
      legalEntitySigner: 'Aura Care EU B.V. (Elena Rossi)',
    });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight */}
      <InsightBlock
        title="Multi-tier Packaging Master Registry (Sheet 02)"
        actionButton={
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[var(--color-primary)] bg-white border border-[var(--color-border)] rounded-md hover:bg-gray-50 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-semibold text-white bg-[var(--color-accent)] rounded-md hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Packaging Component</span>
            </button>
          </div>
        }
      >
        Manages the canonical component breakdown for 10 target products across Primary, Secondary, and Transport tiers.
        Each component ID serves as the master relational key for manufacturer data intake and evidence audits.
        Automated uniqueness checks protect against duplicate BOM entries.
      </InsightBlock>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-[var(--shadow-sm)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search component, product, material..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-[12px] rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>

          {/* Product Filter */}
          <div className="flex items-center gap-1.5 text-[12px]">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[var(--color-muted)] font-medium">Product:</span>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="px-2.5 py-1 text-[12px] rounded-md border border-gray-200 bg-white font-mono"
            >
              <option value="ALL">All 10 Products ({computedComponents.length})</option>
              {productList.map((pid) => (
                <option key={pid} value={pid}>
                  {pid}
                </option>
              ))}
            </select>
          </div>

          {/* Tier Filter */}
          <div className="flex items-center gap-1.5 text-[12px]">
            <span className="text-[var(--color-muted)] font-medium">Tier:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-2.5 py-1 text-[12px] rounded-md border border-gray-200 bg-white font-medium"
            >
              <option value="ALL">All Tiers</option>
              <option value="Primary Packaging">Primary Packaging</option>
              <option value="Secondary Packaging">Secondary Packaging</option>
              <option value="Transport Packaging">Transport Packaging</option>
            </select>
          </div>
        </div>

        <div className="text-[12px] font-mono text-[var(--color-muted)]">
          Showing <span className="font-semibold text-[var(--color-primary)]">{filteredComponents.length}</span> of {computedComponents.length} components
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden border border-[var(--color-border)] card-lift">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-[var(--color-accent)]" />
            <div>
              <h2 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
                Product & Multi-tier Packaging Register (A2:M500)
              </h2>
              <p className="text-[12px] text-[var(--color-muted)]">
                Columns A-I: Manual Master Inputs · Columns J-M: Real-Time Dynamic Array Formulas
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)] text-[var(--color-primary)] text-[11px] tracking-table-head uppercase font-semibold">
                <th className="py-3 px-3 w-24">Component ID</th>
                <th className="py-3 px-3 w-20">Product ID</th>
                <th className="py-3 px-3">Product Name & Model</th>
                <th className="py-3 px-3 w-28">Packaging ID</th>
                <th className="py-3 px-3 w-36">Packaging Tier</th>
                <th className="py-3 px-3">Component Name</th>
                <th className="py-3 px-3 w-32">Material Category</th>
                <th className="py-3 px-3">Manufacturer / Supplier</th>
                <th className="py-3 px-3">Responsible Legal Entity</th>
                <th className="py-3 px-3 w-28">Key Check (Calc)</th>
                <th className="py-3 px-3 w-24 text-center">Rules (Calc)</th>
                <th className="py-3 px-3 w-36">Intake Status (Calc)</th>
                <th className="py-3 px-2 w-12 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredComponents.map((comp) => (
                <tr key={comp.componentId} className="hover:bg-[rgba(5,28,44,0.02)] transition-colors">
                  {/* Component ID */}
                  <td className="py-2.5 px-3 font-mono font-semibold text-[var(--color-primary)] text-[12px]">
                    <input
                      type="text"
                      value={comp.componentId}
                      onChange={(e) => onUpdateComponent(comp.componentId, { componentId: e.target.value })}
                      className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[12px]"
                    />
                  </td>

                  {/* Product ID */}
                  <td className="py-2.5 px-3 font-mono text-[12px]">
                    <input
                      type="text"
                      value={comp.productId}
                      onChange={(e) => onUpdateComponent(comp.componentId, { productId: e.target.value })}
                      className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[12px]"
                    />
                  </td>

                  {/* Product Name */}
                  <td className="py-2.5 px-3 text-[12px]">
                    <input
                      type="text"
                      value={comp.productName}
                      onChange={(e) => onUpdateComponent(comp.componentId, { productName: e.target.value })}
                      className="editable-cell px-1.5 py-0.5 rounded w-full text-[12px]"
                    />
                  </td>

                  {/* Packaging ID */}
                  <td className="py-2.5 px-3 font-mono text-[12px]">
                    <input
                      type="text"
                      value={comp.packagingId}
                      onChange={(e) => onUpdateComponent(comp.componentId, { packagingId: e.target.value })}
                      className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[12px]"
                    />
                  </td>

                  {/* Packaging Tier */}
                  <td className="py-2.5 px-3">
                    <select
                      value={comp.tier}
                      onChange={(e) => onUpdateComponent(comp.componentId, { tier: e.target.value as PackagingTier })}
                      className="editable-cell px-1.5 py-0.5 rounded w-full text-[11px] font-medium"
                    >
                      <option value="Primary Packaging">Primary Packaging</option>
                      <option value="Secondary Packaging">Secondary Packaging</option>
                      <option value="Transport Packaging">Transport Packaging</option>
                    </select>
                  </td>

                  {/* Component Name */}
                  <td className="py-2.5 px-3 font-medium text-[var(--color-primary)] text-[12px]">
                    <input
                      type="text"
                      value={comp.componentName}
                      onChange={(e) => onUpdateComponent(comp.componentId, { componentName: e.target.value })}
                      className="editable-cell px-1.5 py-0.5 rounded w-full text-[12px] font-medium"
                    />
                  </td>

                  {/* Material Category */}
                  <td className="py-2.5 px-3">
                    <select
                      value={comp.materialCategory}
                      onChange={(e) => onUpdateComponent(comp.componentId, { materialCategory: e.target.value as MaterialCategory })}
                      className="editable-cell px-1.5 py-0.5 rounded w-full text-[11px]"
                    >
                      <option value="Glass">Glass</option>
                      <option value="Plastic-PET">Plastic-PET</option>
                      <option value="Plastic-HDPE">Plastic-HDPE</option>
                      <option value="Plastic-PP">Plastic-PP</option>
                      <option value="Paper & Cardboard">Paper & Cardboard</option>
                      <option value="Aluminum">Aluminum</option>
                      <option value="Steel">Steel</option>
                      <option value="Composite Material">Composite Material</option>
                      <option value="Biodegradable Polymer">Biodegradable Polymer</option>
                      <option value="Wood & Textile">Wood & Textile</option>
                    </select>
                  </td>

                  {/* Manufacturer Name */}
                  <td className="py-2.5 px-3 text-[12px] text-[var(--color-body-text)]">
                    <input
                      type="text"
                      value={comp.manufacturerName}
                      onChange={(e) => onUpdateComponent(comp.componentId, { manufacturerName: e.target.value })}
                      className="editable-cell px-1.5 py-0.5 rounded w-full text-[12px]"
                    />
                  </td>

                  {/* Legal Signer */}
                  <td className="py-2.5 px-3 text-[11px] text-[var(--color-muted)]">
                    <input
                      type="text"
                      value={comp.legalEntitySigner}
                      onChange={(e) => onUpdateComponent(comp.componentId, { legalEntitySigner: e.target.value })}
                      className="editable-cell px-1.5 py-0.5 rounded w-full text-[11px]"
                    />
                  </td>

                  {/* Key Unique Check (Calc) */}
                  <td className="py-2.5 px-3">
                    <StatusBadge status={comp.keyUniqueCheck} size="sm" />
                  </td>

                  {/* Applicable Rules (Calc) */}
                  <td className="py-2.5 px-3 text-center font-mono font-semibold text-[var(--color-primary)]">
                    {comp.applicableRulesCount}
                  </td>

                  {/* Intake Status (Calc) */}
                  <td className="py-2.5 px-3">
                    <StatusBadge status={comp.dataIntakeStatus} size="sm" />
                  </td>

                  {/* Delete */}
                  <td className="py-2.5 px-2 text-center">
                    <button
                      onClick={() => onDeleteComponent(comp.componentId)}
                      title="Delete component"
                      className="p-1 text-gray-300 hover:text-[var(--color-negative)] transition-colors rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Component Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.45)] backdrop-blur-sm animate-fade-up">
          <div className="bg-white rounded-xl shadow-[var(--shadow-lg)] max-w-lg w-full p-6 space-y-4 border border-[var(--color-border)]">
            <h3 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
              Register New Packaging Component
            </h3>
            <form onSubmit={handleSaveNewComponent} className="space-y-3 text-[12px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Component ID</label>
                  <input
                    type="text"
                    required
                    value={newComp.componentId}
                    onChange={(e) => setNewComp({ ...newComp, componentId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Product ID</label>
                  <input
                    type="text"
                    required
                    value={newComp.productId}
                    onChange={(e) => setNewComp({ ...newComp, productId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--color-muted)] font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newComp.productName}
                  onChange={(e) => setNewComp({ ...newComp, productName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Packaging ID</label>
                  <input
                    type="text"
                    required
                    value={newComp.packagingId}
                    onChange={(e) => setNewComp({ ...newComp, packagingId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Packaging Tier</label>
                  <select
                    value={newComp.tier}
                    onChange={(e) => setNewComp({ ...newComp, tier: e.target.value as PackagingTier })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200"
                  >
                    <option value="Primary Packaging">Primary Packaging</option>
                    <option value="Secondary Packaging">Secondary Packaging</option>
                    <option value="Transport Packaging">Transport Packaging</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Component Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dispenser Pump"
                    value={newComp.componentName}
                    onChange={(e) => setNewComp({ ...newComp, componentName: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Material Category</label>
                  <select
                    value={newComp.materialCategory}
                    onChange={(e) => setNewComp({ ...newComp, materialCategory: e.target.value as MaterialCategory })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200"
                  >
                    <option value="Glass">Glass</option>
                    <option value="Plastic-PET">Plastic-PET</option>
                    <option value="Plastic-PP">Plastic-PP</option>
                    <option value="Paper & Cardboard">Paper & Cardboard</option>
                    <option value="Aluminum">Aluminum</option>
                    <option value="Steel">Steel</option>
                    <option value="Composite Material">Composite Material</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[var(--color-muted)] font-medium mb-1">Manufacturer / Supplier</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aptar Beauty Packaging"
                  value={newComp.manufacturerName}
                  onChange={(e) => setNewComp({ ...newComp, manufacturerName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-200"
                />
              </div>

              <div>
                <label className="block text-[var(--color-muted)] font-medium mb-1">Responsible Legal Entity & Signer</label>
                <input
                  type="text"
                  required
                  value={newComp.legalEntitySigner}
                  onChange={(e) => setNewComp({ ...newComp, legalEntitySigner: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-200"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-[12px] rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-[12px] font-semibold text-white bg-[var(--color-accent)] rounded-lg hover:opacity-90 shadow-sm"
                >
                  Save Component
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
