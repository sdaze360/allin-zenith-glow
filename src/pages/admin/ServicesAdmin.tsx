import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { AppleButton } from '@/components/ui/AppleButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Wrench, 
  Plus, 
  PencilSimple, 
  Trash, 
  X,
  Check
} from 'phosphor-react';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, isDemoMode } from '@/lib/firebase';

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Wrench');

  useEffect(() => {
    // Realtime listener so admin sees current services immediately
    const servicesCollection = collection(db, 'services');
    const unsubscribe = onSnapshot(servicesCollection, (snapshot) => {
      const servicesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      setServices(servicesList);
      setLoading(false);
    }, () => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const servicesCollection = collection(db, 'services');
      const servicesSnapshot = await getDocs(servicesCollection);
      const servicesList = servicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      
      setServices(servicesList);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch services.',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setIcon('Wrench');
    setCurrentService(null);
    setIsEditing(false);
  };

  const openModal = (service?: Service) => {
    if (service) {
      setIsEditing(true);
      setCurrentService(service);
      setTitle(service.title);
      setDescription(service.description);
      setIcon(service.icon || 'Wrench');
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isDemoMode) {
        if (isEditing && currentService) {
          setServices(prev => prev.map(s => s.id === currentService.id ? {
            ...currentService,
            title,
            description,
            icon,
          } : s));
          toast({ title: 'Success', description: 'Service updated (demo mode).' });
        } else {
          const newService: Service = {
            id: `demo-${Date.now()}`,
            title,
            description,
            icon,
          } as Service;
          setServices(prev => [newService, ...prev]);
          toast({ title: 'Success', description: 'Service added (demo mode).' });
        }
      } else if (isEditing && currentService) {
        // Update existing service
        const serviceRef = doc(db, 'services', currentService.id);
        await updateDoc(serviceRef, {
          title,
          description,
          icon,
        });
        
        toast({
          title: 'Success',
          description: 'Service updated successfully.',
        });
      } else {
        // Add new service
        await addDoc(collection(db, 'services'), {
          title,
          description,
          icon,
        });
        
        toast({
          title: 'Success',
          description: 'Service added successfully.',
        });
      }
      
      closeModal();
      if (!isDemoMode) {
        fetchServices();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: isEditing ? 'Failed to update service.' : 'Failed to add service.',
      });
    }
  };

  const handleDelete = async (service: Service) => {
    if (window.confirm(`Are you sure you want to delete ${service.title}?`)) {
      try {
        await deleteDoc(doc(db, 'services', service.id));
        
        toast({
          title: 'Success',
          description: 'Service deleted successfully.',
        });
        
        fetchServices();
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete service.',
        });
      }
    }
  };

  // Available icons for services
  const iconOptions = [
    { value: 'Palette', label: 'Design' },
    { value: 'VideoCamera', label: 'Video' },
    { value: 'MegaphoneSimple', label: 'Marketing' },
    { value: 'Printer', label: 'Printing' },
    { value: 'Briefcase', label: 'Business' },
    { value: 'Camera', label: 'Photography' },
    { value: 'Wrench', label: 'Services' },
    { value: 'Globe', label: 'Web' },
    { value: 'Crown', label: 'Premium' },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Services Management
          </span>
        </h1>
        
        <AppleButton
          onClick={() => openModal()}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Service
        </AppleButton>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 ? (
            <GlassCard className="col-span-full p-12 text-center">
              <Wrench size={48} className="mx-auto text-muted-foreground mb-4" weight="light" />
              <h3 className="text-xl font-medium mb-2">No Services Yet</h3>
              <p className="text-muted-foreground mb-6">
                Get started by adding your first service.
              </p>
              <AppleButton
                onClick={() => openModal()}
                className="flex items-center gap-2 mx-auto"
              >
                <Plus size={16} />
                Add Service
              </AppleButton>
            </GlassCard>
          ) : (
            services.map((service) => (
              <GlassCard key={service.id} className="group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Wrench size={32} className="text-primary" weight="light" />
                </div>
                
                <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {service.description}
                </p>
                
                <div className="flex gap-2 mt-auto">
                  <AppleButton
                    size="sm"
                    variant="secondary"
                    onClick={() => openModal(service)}
                    className="flex items-center gap-1"
                  >
                    <PencilSimple size={14} />
                    Edit
                  </AppleButton>
                  <AppleButton
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(service)}
                    className="flex items-center gap-1"
                  >
                    <Trash size={14} />
                    Delete
                  </AppleButton>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      )}
      
      {/* Add/Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <GlassCard className="max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {isEditing ? 'Edit Service' : 'Add New Service'}
                </span>
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-muted/50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Logo Design"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Unique brand identities that capture your essence..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <div className="grid grid-cols-3 gap-2">
                  {iconOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setIcon(option.value)}
                      className={`p-3 rounded-lg border ${icon === option.value 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:bg-muted/50'}`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Wrench size={24} className={icon === option.value ? 'text-primary' : 'text-muted-foreground'} />
                        <span className="text-xs">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <AppleButton
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                >
                  Cancel
                </AppleButton>
                <AppleButton
                  type="submit"
                  className="flex items-center gap-2"
                >
                  <Check size={16} />
                  {isEditing ? 'Update Service' : 'Add Service'}
                </AppleButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
}